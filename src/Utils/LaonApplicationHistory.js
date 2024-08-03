import axios from "axios";

export const loanApplicationsLoader = async () => {
  const referralId = localStorage.getItem("AGENT");
  const response = await axios.get(
    "https://backendcrm.vercel.app/api/v2/agent/loanhistory",
    {
      params: {
        referralId: referralId,
      },
    }
  );

  return response.data.LoanList;
};

export const loanApplicationsList = async () => {
  const referralId = localStorage.getItem("AGENT");
  const response = await axios.get(
    "https://backendcrm.vercel.app/api/v2/agent/loanlist",
    {
      params: {
        referralId: referralId,
      },
    }
  );

  return response.data.LoanList;
};

export const loanStatusClient = async () => {
  const response = await axios.get(
    "https://backendcrm.vercel.app/api/v2/loan/status",
    // "https://backendcrm.vercel.app/api/v2/loan/status",
    {
      params: {
        userId: localStorage.getItem("userId"),
      },
    }
  );

  return response.data.allLoans;
};
export const allLoanStatus = async () => {
  const response = await axios.get(
    "https://backendcrm.vercel.app/api/v2/agent/getallchecklist",
    {
      params: { timestamp: new Date().getTime() },
    }
  );

  return response.data.allLoanList;
};
export const allAgents = async () => {
  const response = await axios.get(
    "https://backendcrm.vercel.app/api/v1/agent/allagents"
  );

  return response.data.allAgents;
};
