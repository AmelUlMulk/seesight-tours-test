export function optimizeVideoUrl(videoUrl: string): string {
  // Build the Cloudinary transformation string
  const changeFormat =
    videoUrl.search('mp4') > -1 ? videoUrl.replace('mp4', 'mp4') : videoUrl;
  const newLink = changeFormat.split('/upload');

  // Generate the optimized video URL
  const optimizedUrl = `${newLink[0]}/upload/q_auto,w_400,${newLink[1]}`;

  // Return the optimized URL
  return optimizedUrl;
}
export function optimizeImageUrl(url: string): string {
  // Build the Cloudinary transformation string

  const newLink = url.replace('jpeg', 'webp').split('/upload');

  // Generate the optimized video URL
  const optimizedUrl = `${newLink[0]}/upload/q_auto,w_600,${newLink[1]}`;

  // Return the optimized URL
  return optimizedUrl;
}
