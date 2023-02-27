interface IProps {
  reviewPage: Record<string, any> | undefined;
}
const FooterAbout = ({ reviewPage }: IProps) => {
  console.log('reviewPage:', reviewPage);
  return <section id="footer-about"></section>;
};

export default FooterAbout;
