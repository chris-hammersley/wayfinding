import { useState } from 'react';

const useModal2 = () => {
    const [isShowing, setIsShowing] = useState(false);
  
    function toggle() {
      setIsShowing(!isShowing);
    }
  
    return {
      isShowing,
      toggle,
    }
  };
  
  export default useModal2;