import React from 'react';
import {connect} from 'react-redux';
import {setEditorText} from './javalabRedux';
import PropTypes from 'prop-types';
import PaneHeader, {PaneSection} from '@cdo/apps/templates/PaneHeader';
import {EditorState, basicSetup} from '@codemirror/basic-setup';
import {java} from '@codemirror/lang-java';
import {oneDarkTheme, oneDarkHighlightStyle} from '@codemirror/theme-one-dark';
import {EditorView, keymap} from '@codemirror/view';
import {defaultTabBinding} from '@codemirror/commands';

const style = {
  editor: {
    width: '100%',
    height: 600,
    backgroundColor: '#282c34'
  }
};

class JavalabEditor extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    // populated by redux
    editorText: PropTypes.string,
    setEditorText: PropTypes.func
  };

  componentDidMount() {
    this.editor = new EditorView({
      state: EditorState.create({
        extensions: [
          basicSetup,
          java(),
          keymap.of([defaultTabBinding]),
          oneDarkTheme,
          oneDarkHighlightStyle
        ]
      }),
      parent: this._codeMirror,
      dispatch: this.dispatchEditorChange()
    });
  }

  dispatchEditorChange = () => {
    return tr => {
      // we are overwriting the default dispatch method for codemirror,
      // so we need to manually call the update method.
      this.editor.update([tr]);
      // if there are changes to the editor, update redux.
      if (!tr.changes.empty && tr.newDoc) {
        this.props.setEditorText(tr.newDoc.toString());
      }
    };
  };

  render() {
    return (
      <div style={this.props.style}>
        <PaneHeader hasFocus={true}>
          <PaneSection>Editor</PaneSection>
        </PaneHeader>
        <div ref={el => (this._codeMirror = el)} style={style.editor} />
      </div>
    );
  }
}

export default connect(
  state => ({
    editorText: state.javalab.editorText
  }),
  dispatch => ({
    setEditorText: editorText => dispatch(setEditorText(editorText))
  })
)(JavalabEditor);
