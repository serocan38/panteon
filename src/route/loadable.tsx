import { Suspense, ComponentType } from 'react';
import LoadingScreen from '../component/loading/loadingScreen';

const Loadable = <P extends object>(Component: ComponentType<P> & any) => {
  return (props: P) => {
    return (
      <Suspense
        fallback={
          <LoadingScreen
            sx={{
              top: 0,
              left: 0,
              width: '100%',
              zIndex: 9999,
              position: 'fixed',
            }}
          />
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };
};

export default Loadable;
