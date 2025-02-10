import { Puff } from 'react-loader-spinner';
const Loader = () => {
  return <div>(<Puff
    visible={true}
    height="80"
    width="80"
    color="var(--prim-color-blue)"
    ariaLabel="puff-loading"
    wrapperStyle={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}

    />)
  </div>;
};

export default Loader;
