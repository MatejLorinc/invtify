"use client"

import {useEffect, useState} from "react";

function textToElements(text: string) {
    const textElements = [];
    for (let i = 0; i < text.length; i++) {
        textElements.push(<span className="dynamic-letter letter-in" key={i}>{text[i]}</span>);
    }
    return textElements;
}

export default function DynamicText({options, stay}: { options: string[], stay: number }) {
    const [text, setText] = useState(textToElements(options[0]));

    useEffect(() => {
        let textIndex = 0;

        const textUpdater = setInterval(() => {
            textIndex++;
            if (textIndex >= options.length) {
                textIndex = 0;
            }

            const option = options[textIndex];
            const textElements: JSX.Element[] = [];

            const elementAppendInterval = setInterval(() => {
                let characterIndex = textElements.length;
                if (characterIndex >= option.length) {
                    clearInterval(elementAppendInterval);
                    return;
                }

                textElements.push(<span className="dynamic-letter" key={characterIndex}>{option[characterIndex]}</span>)
                setText([...textElements]);
            }, 50);

            setText([]);
        }, stay);

        return () => clearInterval(textUpdater);
    }, [options, stay]);


    return (
        <span className="dynamic-text">{text}</span>
    );
}