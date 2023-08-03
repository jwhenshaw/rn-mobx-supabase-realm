import React from 'react';
import { supabase } from '../lib/supabase';

const useSignOut = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const onSignOut = React.useCallback((successCb: () => void) => {
    setLoading(true);
    supabase.auth.signOut().then(res => {
      const { error: thisError } = res;
      if (thisError) {
        setError(thisError);
      } else {
        successCb();
      }
    });
  }, []);

  return { onSignOut, loading, error };
};

export default useSignOut;
