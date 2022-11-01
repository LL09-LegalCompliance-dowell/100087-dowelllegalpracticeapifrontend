import React, { useEffect, useState } from 'react'
import axios from 'axios';
import renderHTML from 'react-render-html';

function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState();
  const [policy, setPolicy] = useState("")

  const fetchPolicy = async () => {
    try {
      setLoading(true);
      const URL =
        `https://100087.pythonanywhere.com/policy/FB1010000000001665306290565391/${policy}/`;
      const res = await axios.get(URL);
      if (res.data) {
        setdata(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setPolicy(e.target.value);
  }
  useEffect(() => {
    fetchPolicy()
    console.log(policy)
  }, [policy]);
  return (
    <div style={{padding:50, alignItems:"center"}}>
      <p style={{fontSize:20, fontWeight:"bold", padding:30}}>View Legalzard Policies</p>
      <div style={{flex:"row"}}>
        <p>Get</p>
        <div>
          <select id = "dropdown" onChange={handleChange}>
            <option value="N/A">Select Policy</option>
            <option value="app-privacy-policy">App Privacy Policy</option>
            <option value="mobile-app-privacy-policy-summary">Mobile App Privacy Policy Summary</option>
            <option value="disclaimer">Disclaimer</option>
            <option value="website-privacy-policy">Website Privacy Policy</option>
            <option value="cookies-policy">Cookies Policy</option>
            <option value="terms-and-conditions">Terms and Conditions</option>
            <option value="end-user-license-agreement">End  user License Agreement</option>
            <option value="return-refund-policy">Return Refund Policy</option>
            <option value="safety-disclaimer">Safety Disclaimer</option>
            <option value="website-security-policy">Website Security Policy</option>
          </select>
        </div>        
      </div>
      <div style={{padding:20}}>
        {loading ? "Loading Policy, Please wait..." : null}
      </div>      
      <div>
        {
          data ? <div>{renderHTML(data)}</div> : "No Policy"
        }
      </div>
    </div>
  )
}

export default Home