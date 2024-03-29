import React from 'react';
import _isFunction from 'lodash/isFunction';
import './index.less';
import {EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import host from 'host';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty()
        };
    }

    componentWillReceiveProps = (nextProps) => {
        const {editorState} = nextProps;
        if (editorState) {
            this.setState({editorState});
        }
    }

    uploadImageCallBack = (file) => {
        console.log('uploadImageCallBack   file === ', file);
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', host.UPLOAD);
                const data = new FormData();
                data.append('file', file);
                xhr.send(data);

                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    response.data.link = restUrl.BASE_HOST + response.data.link;
                    console.log('response == ', response);
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            },
        );
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });

        if (_isFunction(this.props.onEditorStateChange)) {
            return this.props.onEditorStateChange(editorState);
        }
    }

    render() {
        const {editorState} = this.state;
        const {
            toolbar,
            onEditorStateChange,
            ...restProps
        } = this.props;
        return (
            <Editor
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    image: {
                        previewImage: true,
                        uploadCallback: this.uploadImageCallBack,
                        alt: {present: true, mandatory: false},
                    },
                }}
                {...restProps}
            />
        );
    }
}

Index.defaultProps = {
    localization: {locale: 'zh'},
    wrapperClassName: "wysiwyg-wrapper",
};

export default Index;
