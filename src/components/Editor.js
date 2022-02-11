import React, { useEffect, useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt, faCopy } from '@fortawesome/free-solid-svg-icons';

const Editor = ({ displayName, language, value, onChange }) => {

    const [open, setOpen] = useState(true)
    const [copy, setCopy] = useState(false)

    const handleChange = (editor, data, value) => {
        onChange(value)
    }

    const copied = () => {
        setCopy(true)
        navigator.clipboard.writeText(value)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCopy(false)
        }, 1000);
        return () => clearTimeout(timeout)
    }, [copy])

    return (
        <div className={`editor-container ${open ? '' : 'collapsed'}`}>
            <div className='editor-title'>
                {displayName}
                <div>
                    <button
                        type='button'
                        className='expand-collapse-button'
                        onClick={() => setOpen(!open)}
                    >
                        <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
                    </button>
                    {value && (
                        <button className='copyBtn' onClick={copied}>{copy ? 'Copied' : 'Copy'}</button>
                        // <FontAwesomeIcon icon={faCopy} />
                    )}
                </div>
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className='code-mirror-wrapper'
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    lineNumbers: true,
                    theme: 'material',
                    matchBrackets: true,
                    autoCloseBrackets: true,
                }}
            />
        </div>
    )
};

export default Editor;
