export default function WelcomeScreen({ onBegin }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
      <h1 className="font-serif text-3xl md:text-5xl leading-tight text-gray-800 mb-8">
        Where does OAE stand? Your unfiltered view.
      </h1>
      <div className="space-y-5 text-base md:text-lg text-gray-600 leading-relaxed">
        <p>
          We are building the brand strategy OAE will use for the next stage of growth, and it starts with you! This questionnaire asks how you personally see the company, the customer, and the story. Three rules make it work:
        </p>
        <ol className="space-y-4 pl-6 list-decimal">
          <li><strong className="text-gray-800">Answer alone.</strong> Do not discuss the questions with anyone before submitting. We want the honest spread of views across the team, and that only works if the answers are yours.</li>
          <li><strong className="text-gray-800">Gut first.</strong> Write the first true thing that comes to mind. Unpolished beats polished.</li>
          <li><strong className="text-gray-800">There are no wrong answers.</strong> Where people disagree is the most useful data we will get. You cannot get this wrong, you can only make it less honest.</li>
        </ol>
      </div>
      <div className="mt-10 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500 leading-relaxed">
          Your answers go to Laura Thomas directly. Findings will be discussed as patterns, never attributed line by line in front of the group. It takes about 25 minutes. Please complete it in one sitting.
        </p>
      </div>
      <button
        onClick={onBegin}
        className="mt-10 px-10 py-4 bg-[#6B1F2A] text-white font-medium tracking-wide rounded hover:bg-[#5a1922] transition-colors"
      >
        Begin
      </button>
    </div>
  );
}