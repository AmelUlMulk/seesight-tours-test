interface IProps {
  reviewPage: Record<string, any> | undefined;
}
const FooterAbout = ({ reviewPage }: IProps) => {
  return <section id="footer-about"></section>;
};

export default FooterAbout;
