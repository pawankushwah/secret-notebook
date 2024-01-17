import { useCallback, useEffect, useState } from "react";
import styles from "./App.module.css";
import { StickyNotes } from "../../components/sticky-notes";
import Guide from "../../components/guide";
import SecretsLoader from "../../components/secrets-loader";

function Home() {
    const [isGuideHidden, setIsGuideHidden] = useState(true);
    const [isSecretLoaderHidden, setIsSecretLoaderHidden] = useState(false);
    const [isStickyNotesHidden, setIsStickyNotesHidden] = useState(true);

    const hideGuide = useCallback(() => {
        setIsGuideHidden(true);
        setIsStickyNotesHidden(false);
    }, []);

    const hideSecretLoader = () => {
        setIsGuideHidden(false);
        setIsSecretLoaderHidden(true);
    }

    const [messageBubbleMessageList, setMessageBubbleMessageList] = useState([]);
    useEffect(()=> {
        let response = fetch("http://127.0.0.1:3333/getGuideMessages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        let result = response.then((response) => response.json());
        result.then((data) => setMessageBubbleMessageList(data));
    }, [])

    const [notes, setNotes] = useState([]);
    useEffect(()=> {
        let response = fetch("http://127.0.0.1:3333/getSecretNotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        let result = response.then((response) => response.json());
        result.then((data) => {
            setNotes(data)
            setTimeout(() => (setIsSecretLoaderHidden(true)), 3000)
            setIsGuideHidden(false);
        });
    }, [])

    return (
        <div>
            <div className="lg:hidden">
                <Guide hidden={false} setHidden={hideGuide} messageData={[["Secrets can only be seen on the secret screen size. Please switch to big screens (width > 1024)"]]} showButton={false} />
            </div>
            <div className="hidden lg:block">
                <div className={styles.app}>
                    <div className={`absolute top-0 left-0 z-50 ${isSecretLoaderHidden ? "hidden" : "block"}`}>
                        <SecretsLoader onHide={hideSecretLoader} />
                    </div>
                    <div className="flex justify-center items-center">
                        {!isGuideHidden && <Guide hidden={false} setHidden={hideGuide} messageData={messageBubbleMessageList} showButton={true} />}
                        {!isStickyNotesHidden && <StickyNotes notesData={notes} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
