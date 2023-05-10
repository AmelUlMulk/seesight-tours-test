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
  if (url.includes('.jpg') === false || url.includes('.jpeg') === false) {
    return url;
  }
  let newLink;
  if (url.includes('jpeg')) {
    console.log('the url', url);
    newLink = url.replace('jpeg', 'webp').split('/upload');
  }
  if (url.includes('jpg')) {
    newLink = url.replace('jpg', 'webp').split('/upload');
  }

  // Generate the optimized video URL
  //@ts-ignore
  const optimizedUrl = `${newLink[0]}/upload/q_auto,w_600,${newLink[1]}`;

  // Return the optimized URL
  return optimizedUrl;
}
