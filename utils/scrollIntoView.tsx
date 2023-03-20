/* eslint-disable prefer-const */
function scrollToElement(id: string) {
  const mediaQueryScroll = window.matchMedia('(max-width: 400px)');
  let element = document.getElementById(id);
  let headerOffset = mediaQueryScroll.matches ? 90 : 100;
  let elementPosition;
  if (element) {
    elementPosition = element.getBoundingClientRect().top;
  }
  //@ts-ignore
  let offsetPosition = elementPosition - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}
export default scrollToElement;
