import React, { useState, useEffect } from "react";
import './index.css';

const Frame = ({ src, alt, idNumber, likeP, dislikeP }) => {
    const [like, setLike] = useState(sessionStorage.getItem(idNumber) !== null);

    useEffect(() => {

    }, [like])

    const liked = () => {
        setLike(true);
        if (sessionStorage.getItem(idNumber) === null) {
            sessionStorage.setItem(idNumber, src);
        }
    }

    const disliked = () => {
        setLike(false);
        if (sessionStorage.getItem(idNumber) !== null) {
            sessionStorage.removeItem(idNumber);
        }
    }

    const f = () => {
        if (like) {
            disliked();
            dislikeP();
        } else {
            liked();
            likeP();
        }
    }

    const download = e => {
        e.preventDefault();
        console.log(e.target.href);
        fetch(e.target.href, {
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "image.png"); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="frame">
            <img
                src={src}
                alt={alt}
                width='700'
                height='400'
            />
            <input
                type={'checkbox'}
                checked={like}
                onChange={f}
            />
            <a
                href={src}
                download
                onClick={e => download(e)}
            >
                download
            </a>
        </div>
    )
}

export { Frame };