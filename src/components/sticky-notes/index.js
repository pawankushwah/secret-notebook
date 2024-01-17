import { forwardRef, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Link } from "react-router-dom";
import styles from "./style.module.css"

const Page = forwardRef((props, ref) => {
    return (
        <div className="bg-yellow-100 text-black overflow-hidden rounded-r-lg w-full h-full shadow-inner shadow-black" ref={ref}>{props.children}</div>
    );
});

export function StickyNotes({notesData}) {
    const book = useRef(0);
    console.log(book.current);

    return (
        <div className="">
            <div className="md:w-screen md:h-auto m-auto p-2 box-border flex justify-center">
                <HTMLFlipBook ref={book} width={400} height={550} maxHeight={""} showCover={true} autoSize={true} maxShadowOpacity={"0.5"}>
                    <Page number="1">
                        <img src="/resources/secret-book-cover.jpg" alt="book cover" />
                    </Page>
                    {notesData.map((data, index) => {
                        return (
                            <Page key={index} number={index + 1}>
                                <div className="p-4 overflow-auto h-full">
                                    <div className="text-center">Secret {index + 1}</div>
                                    <div className="text-xs mt-2 h-auto">{data.secret}</div>
                                </div>
                            </Page>
                        )
                    })}
                    {<Page number="4">
                        <img src="/resources/book-back-cover.jpg" alt="book cover" />
                    </Page>}
                </HTMLFlipBook>
                <Link to="/login" className="w-24 h-80 cursor-pointer">
                    <img src="/resources/pen.png" alt="pen" className="h-80 z-10" />
                    <div className={`absolute -top-40 -left-24 z-20 ${styles.bubble} ${styles.bubblePointer} animate-bounce2 cursor-pointer text-white font-bold`}>
                        <div className="text-black font-normal">click on pen to create your secret</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}