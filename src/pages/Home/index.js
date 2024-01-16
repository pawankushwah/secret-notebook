import { useCallback, useState } from "react";
import styles from "./App.module.css";
import { StickyNotes } from "../../components/sticky-notes";
import Guide from "../../components/guide";
import SecretsLoader from "../../components/secrets-loader";
import { Link } from "react-router-dom";

const messageBubbleMessageList = [
    ["Welcome to Secret Notes! Here you can read the secrets of other people"],
    ["You can change the page of the Secret book by clicking on the page or swiping the page"],
    ["If you want to create your own secret than you can click on the pen available on the right side of the secret book"],
    ["Now you are ready for the Enjoy the secrets. Have Fun!"]
]

const notes = [
    { message: "Hello World" },
    { message: "Hello World 2 Hello World 2 Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2Hello World 2" },
    { message: "Hello World 3" },
    { message: "Hello World 4" },
    { message: "Hello World 5" },
    { message: "Hello World 6" }
]

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
