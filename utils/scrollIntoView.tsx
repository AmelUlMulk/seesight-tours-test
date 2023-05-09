/* eslint-disable prefer-const */
function scrollToElement(id: string) {
  console.log('the id ', id);
  const mediaQueryScroll = window.matchMedia('(max-width: 400px)');
  let element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
  /* console.log('the element', element);
  let headerOffset = mediaQueryScroll.matches ? 90 : 100;
  let elementPosition;
  if (element) {
    elementPosition = element.getBoundingClientRect().bottom;
  }
  console.log('the position', elementPosition);
  //@ts-ignore
  let offsetPosition = elementPosition - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  }); */
}
export default scrollToElement;
