import { useEffect, useState } from "react";

const useVerified = (email) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifiedLoading, setIsVerifiedLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(
        `https://buysell-decor-server.vercel.app/user/sellerVerified/${email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setIsVerified(data.verified);
          setIsVerifiedLoading(false);
        });
    }
  }, [email]);
  return [isVerified, isVerifiedLoading];
};

export default useVerified;
