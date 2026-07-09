import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { isEmailBlocked } from "@/lib/blocklist";
import QuizEntry from "@/components/quiz/QuizEntry";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizEmailCapture from "@/components/quiz/QuizEmailCapture";
import QuizResult from "@/components/quiz/QuizResult";
import { QUESTIONS, calculateScores } from "@/components/quiz/quizData";

function generateSessionId() {
  return "qs_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const SESSION_ID = generateSessionId();

async function trackEvent(eventType, extra = {}) {
  try {
    await base44.entities.QuizEvent.create({
      eventType,
      sessionId: SESSION_ID,
      timestamp: new Date().toISOString(),
      ...extra,
    });
  } catch {}
}

export default function Quiz() {
  // "entry" | "question" | "capture" | "result"
  const [stage, setStage] = useState("entry");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({}); // { q0: ["A","C"], q1: [...] }
  const [scores, setScores] = useState(null);
  const [primaryResult, setPrimaryResult] = useState(null);
  const [secondaryResult, setSecondaryResult] = useState(null);
  const [userData, setUserData] = useState({ firstName: "", email: "" });
  const startedAt = useRef(null);

  const handleBegin = () => {
    startedAt.current = new Date().toISOString();
    trackEvent("quiz_start");
    trackEvent("question_view", { questionNumber: 1 });
    setStage("question");
  };

  const handleAnswer = (qIndex, selected) => {
    setAnswers((prev) => ({ ...prev, [`q${qIndex}`]: selected }));
    trackEvent("question_answer", { questionNumber: qIndex + 1 });
  };

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      const nextQ = currentQ + 1;
      setCurrentQ(nextQ);
      trackEvent("question_view", { questionNumber: nextQ + 1 });
    } else {
      trackEvent("email_capture");
      setStage("capture");
    }
  };

  const handleBack = () => {
    if (currentQ === 0) {
      setStage("entry");
    } else {
      setCurrentQ((q) => q - 1);
    }
  };

  const handleEmailSubmit = async ({ firstName, email }) => {
    const blocked = await isEmailBlocked(email);
    if (blocked) {
      alert("We're unable to process your submission at this time.");
      return;
    }
    setUserData({ firstName, email });
    const computed = calculateScores(answers);
    setScores(computed.scores);
    setPrimaryResult(computed.primaryResult);
    setSecondaryResult(computed.secondaryResult);

    // Save submission
    try {
      await base44.entities.QuizSubmission.create({
        firstName,
        email,
        answers,
        scores: computed.scores,
        primaryResult: computed.primaryResult,
        secondaryResult: computed.secondaryResult || null,
        quizStartedAt: startedAt.current,
        submittedAt: new Date().toISOString(),
        emailSent: false,
        nurtureEmailsSent: 0,
        primaryCtaClicked: false,
        discoveryCallCtaClicked: false,
      });

      // Notify Laura of new quiz submission
      await base44.integrations.Core.SendEmail({
        to: "hello@laurajanethomas.biz",
        subject: `New Quiz Submission: ${firstName} — ${computed.primaryResult}`,
        body: `New quiz submission received.\n\nName: ${firstName}\nEmail: ${email}\nPrimary Result: ${computed.primaryResult}${computed.secondaryResult ? `\nSecondary Result: ${computed.secondaryResult}` : ""}\nSubmitted: ${new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" })}`,
      });
    } catch {}

    trackEvent("result_view", {
      resultName: computed.primaryResult,
      userEmail: email,
    });

    setStage("result");
  };

  const handlePrimaryCtaClick = () => {
    trackEvent("primary_cta_click", { resultName: primaryResult });
  };

  const handleSecondaryCtaClick = () => {
    trackEvent("secondary_cta_click", { resultName: secondaryResult });
  };

  const handleDiscoveryClick = () => {
    trackEvent("discovery_call_click", { resultName: primaryResult });
  };

  return (
    <div style={{ backgroundColor: "#F5EDE0", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {stage === "entry" && <QuizEntry onBegin={handleBegin} />}
      {stage === "question" && (
        <QuizQuestion
          question={QUESTIONS[currentQ]}
          qIndex={currentQ}
          total={QUESTIONS.length}
          selected={answers[`q${currentQ}`] || []}
          onAnswer={(sel) => handleAnswer(currentQ, sel)}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {stage === "capture" && (
        <QuizEmailCapture onSubmit={handleEmailSubmit} />
      )}
      {stage === "result" && (
        <QuizResult
          primaryResult={primaryResult}
          secondaryResult={secondaryResult}
          firstName={userData.firstName}
          onPrimaryCtaClick={handlePrimaryCtaClick}
          onSecondaryCtaClick={handleSecondaryCtaClick}
          onDiscoveryClick={handleDiscoveryClick}
        />
      )}
    </div>
  );
}