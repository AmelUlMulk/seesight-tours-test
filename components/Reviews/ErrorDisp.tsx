interface IProps {
  error: string;
}
const ErrorDisp = ({ error }: IProps) => {
  return <div>{error}</div>;
};

export default ErrorDisp;
