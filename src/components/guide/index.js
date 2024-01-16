import { memo, useRef, useState } from "react";
import styles from "./style.module.css"

function Guide({ hidden, setHidden, messageData, showButton }) {
    const helpContainer = useRef(0);

    const [currentMessageNo, setCurrentMessageNo] = useState(0);

    const showNextMessage = () => {
        setCurrentMessageNo((currentMessageNo) => {
            if (currentMessageNo < messageData.length - 1) {
                return currentMessageNo + 1;
            } else {
                setHidden(true);
                return 0;
            }
        });
    }

    const showPrevMessage = () => {
        setCurrentMessageNo((currentMessageNo) => {
            return (currentMessageNo > 0) ? currentMessageNo - 1 : 0;
        })
    }

    return (
        <div ref={helpContainer}>
            <div className="relative w-fit h-fit">
                <img className="w-60 md:w-96 absolute md:-left-20" src="/resources/images/girl-piping-out.png" alt="girl piping out" />
                <div className={`absolute ${styles.bubble} ${styles.bubblePointer} left-20 animate-bounce2 cursor-pointer text-white font-bold`}>
                    <div className="text-black font-normal">{messageData[currentMessageNo][0]}</div>
                    {showButton &&
                        <div className="mt-5">
                            <div className="flex justify-evenly">
                                {currentMessageNo > 0 && <div className="p-2 w-full" onClick={showPrevMessage}>Back</div>}
                                <div onClick={showNextMessage} className="bg-orange-400 p-2 w-full">
                                    {(currentMessageNo < messageData.length - 1) ? "Continue" : "Finish"}
                                </div>
                            </div>
                            <div className="bg-gray-200 p-2" onClick={() => setHidden(true)}>Skip</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(Guide)