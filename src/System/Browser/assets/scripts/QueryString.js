



using("System.Data.QueryString");

(function () {
	var loc = location.constructor ? location.constructor.prototype : location;

	// Chrome 23 可能更新 location
	if (Object.defineProperty) {
		Object.defineProperty(loc, "query", {
			get: function () {
				return this._query || (this._query = QueryString.parse(this.search));
			}
		});
	} else {
		loc.query = QueryString.parse(location.search);
	}
})();