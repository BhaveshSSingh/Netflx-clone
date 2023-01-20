import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllEmails,
  fetchEmailBody,
  saveClickedEmail,
} from "../app/features/emailSlice";
import { addToUnReadEmails } from "../app/features/emailSlice";
import { addToReadEmails } from "../app/features/emailSlice";
import EmailTab from "./EmailTab";
import EmailBody from "./EmailBody";

const EmailList = () => {
  const [splitScreen, setSplitScreen] = useState("");
  const [hidden, setHidden] = useState("hidden");

  useEffect(() => {
    dispatch(fetchAllEmails());
  }, []);
  const allEmails = useSelector((state) => state.email.listOfEmails);

  const dispatch = useDispatch();

  const emailClickHandler = (email) => {
    setSplitScreen("flex");
    setHidden("");

    dispatch(addToReadEmails(email));
    dispatch(addToUnReadEmails(email));
    dispatch(fetchEmailBody(email.id));
    dispatch(saveClickedEmail(email));
  };

  return (
    <>
      <div className={`${splitScreen}`}>
        <div>
          {allEmails.map((email) => (
            <div onClick={() => emailClickHandler(email)}>
              <EmailTab email={email} key={email.id} />
            </div>
          ))}
        </div>

        <div
          className={`h-fit rounded-lg border border-borderClr pr-9  pt-6 mt-4 bg-white ml-6 flex  max-w-[60%] ${hidden}`}
        >
          <EmailBody />
        </div>
      </div>
    </>
  );
};

export default EmailList;
