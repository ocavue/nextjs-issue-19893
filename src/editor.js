import React from 'react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import 'prosemirror-view/style/prosemirror.css'
import { schema } from "prosemirror-schema-basic"

function getInputText (transaction) {
    try {
        return transaction.steps[0].slice.content.content[0].text
    } catch (error) {
        return ''
    }
}

export class InnerEditor extends React.Component {
    constructor () {
        super()

        this.editorRef = React.createRef()

        this.view = new EditorView(null, {
            state: EditorState.create({
                schema: schema,
                doc: "",
            }),
            dispatchTransaction: transaction => {
                const { state, transactions } = this.view.state.applyTransaction(transaction)

                // console.log("transaction:",transaction)
                const text = getInputText(transaction)
                console.log('input text:', text)

                if (text == '9') {
                    throw new Error('Something wrong')
                }

                this.view.updateState(state)

                this.forceUpdate()
            },

        })
    }

    componentDidMount () {
        this.editorRef.current.appendChild(this.view.dom)
    }

    render () {
        return <div className="editor" ref={this.editorRef} />
    }
}

export const Editor = () => {
    if (typeof document == 'undefined') {
        return null  // SSR mode
    } else {
        return <InnerEditor />
    }
}