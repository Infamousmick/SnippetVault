import BaseLayout from "../../Layout/BaseLayout";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./OauthSuccess.css";

const OauthSuccess = () => {
    const searcParams = new URLSearchParams(location.search)
  return <BaseLayout>OauthSuccess</BaseLayout>;
};

export default OauthSuccess;
