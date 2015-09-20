var EditorState = function(readonly) {
	this.state_ = readonly ? EditorState.READ_ONLY : undefined;
};

EditorState.prototype.setState = function(newState, data) {
	data = data || {};
	var allowedNewStates = [];
	if (this.state_ == EditorState.NEW) {
		allowedNewStates = [EditorState.READY];

	} else if (this.state_ == EditorState.READY) {
		allowedNewStates = [EditorState.NEW, EditorState.SAVED];

	} else if (this.state_ == EditorState.SAVED) {
		allowedNewStates = [EditorState.NEW, EditorState.READ_ONLY];

	} else if (this.state_ == EditorState.READ_ONLY) {
		allowedNewStates = [EditorState.NEW];
	}

	if (allowedNewStates.indexOf(newState) === -1 && this.state_) {
		throw new Error('Transition to state from state "' + this.state_ + '" to "' + newState + '" not allowed.');
	}
	this.setState_(newState, data);
};

EditorState.prototype.setState_ = function(newState, data) {
	this.state_ = newState;
	console.log('new state', newState);
	var event = new CustomEvent('editor-state-change-request', {detail: {'state': newState, data: data}});

	document.body.dispatchEvent(event);
}

EditorState.prototype.getState = function() {
	return this.state_;
}

// Basic state on page load.
EditorState.NEW = 0;

// State once the editor is initialized and interactive.
EditorState.READY = 1;

// State after the user has pressed save at least once.
EditorState.SAVED = 2;

// State when the user loaded an existing url.
EditorState.READ_ONLY = 3;