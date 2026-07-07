Deno.serve(async (req) => {
  try {
    const channelId = "UCQj6EVfQ72I_F_VXtJ2dcEw";
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const res = await fetch(rssUrl);
    if (!res.ok) {
      return Response.json({ error: "Failed to fetch feed" }, { status: 502 });
    }
    const xml = await res.text();

    // Parse <entry> blocks from the YouTube RSS feed.
    const entries = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;
    while ((match = entryRegex.exec(xml)) !== null) {
      const block = match[1];
      const idMatch = block.match(/<id>yt:video:([^<]+)<\/id>/);
      const titleMatch = block.match(/<title>([^<]+)<\/title>/);
      const thumbMatch = block.match(/<media:thumbnail[^>]+url="([^"]+)"/);
      const dateMatch = block.match(/<published>([^<]+)<\/published>/);
      if (idMatch) {
        const videoId = idMatch[1];
        entries.push({
          videoId,
          title: titleMatch ? titleMatch[1] : "",
          thumbnail: thumbMatch ? thumbMatch[1] : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          published: dateMatch ? dateMatch[1] : "",
          url: `https://www.youtube.com/watch?v=${videoId}`,
        });
      }
    }

    return Response.json({ videos: entries.slice(0, 6) });
  } catch (error) {
    console.error("[getChannelVideos] Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});