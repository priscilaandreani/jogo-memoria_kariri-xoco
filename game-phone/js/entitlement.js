var AEMM = AEMM || {};

AEMM.Entitlement = (function() {
	'use strict';

	/**
	 * Constructor for the Entitlement class.
	 *
	 * @constructor
	 */
	function Entitlement() {}

	/**
	 * Initializes the Entitlement class, should only be called once.
	 */
	Entitlement.prototype.initialize = function() {
		// calls helper to add click listeners to the existing DOM elements
		this._bindDom();
		// calls helper to add listeners to the necessary events
		this._bindEvents();
		// calls helper to toggle the view on initial load
		this.toggleView();
	};

	/**
	 * Displays the app sign in dialog.
	 */
	Entitlement.prototype.login = function() {
		cq.mobile.user.launchSignInUX();
	};

	/**
	 * Logs the user out of the app.
	 */
	Entitlement.prototype.logout = function() {
		cq.mobile.user.signOut();
	};

	/**
	 * Handles when the app authentication state changes.
	 */
	Entitlement.prototype.onAuthChangeHandler = function() {
		this.toggleView();
	};

	/**
	 * Handles when the app is:
	 * 1. brought to foreground after backgrounding it or swiping to another app, OR
	 * 2. navto or swipe to from another article/collection from within the app.
	 */
	Entitlement.prototype.onResumeHandler = function() {
		this.toggleView();
	};

	/**
	 * Updates the view based on the authentication state.
	 * States:
	 * 1. if user is authenticated, displays panel for logged in state.
	 * 2. if user is not authenticated, displays panel for logged out state.
	 */
	Entitlement.prototype.toggleView = function() {
		if (cq.mobile.user.isAuthenticated) { // logged in
			this.dom.panel.unauthenticated.classList.add('aemm--hide');
			this.dom.panel.authenticated.classList.remove('aemm--hide');
		} else { // logged out
			this.dom.panel.authenticated.classList.add('aemm--hide');
			this.dom.panel.unauthenticated.classList.remove('aemm--hide');
		}
	};

	/**
	 * Add listeners to handle auth state changes and foregrounding the article.
	 * Should only be called once internally by Entitlement class.
	 */
	Entitlement.prototype._bindEvents = function() {
		// handles when the authentication state changes (log in/out) in the app
		document.addEventListener('isauthenticatedchanged', this.onAuthChangeHandler.bind(this), false);

		// handles when bringing the article to the foreground after backgrounding the app
		document.addEventListener('resume', this.onResumeHandler.bind(this));

		// handles when navto or swipe to the article
		window.onAppear = this.onResumeHandler.bind(this);
	};

	/**
	 * Add user event listeners to the logged in and logged out states.
	 */
	Entitlement.prototype._bindDom = function() {
		this.dom = {
			context: {
				shortTitle: document.getElementById('aemm__context--shortTitle')
			},
			panel: {
				authenticated: document.getElementById('aemm__state--authenticated'),
				unauthenticated: document.getElementById('aemm__state--unauthenticated')
			}
		};

		if (this.dom.context.shortTitle && cq.mobile.context.entity.metadata.shortTitle) {
			this.dom.context.shortTitle.innerHTML = cq.mobile.context.entity.metadata.shortTitle;
		}
	};

	return Entitlement;
})();
