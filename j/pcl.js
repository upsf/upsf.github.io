function parseCommandLineA(x) {
		x = x.trim();
		var inq = false, s = "", args = [];
		for (var i = 0; i < x.length; i++) {
			var cc = x.charAt(i), nc = x.charAt(i + 1);
			// checks
			var cQ = cc == "\"", cS = cc == "\\", nQ = nc == "\"", nS = nc == "\\";
			if (inq) {
				if (cS && nS) { // push slash
					s += nc;
					i++;
				} else if (cS && nQ) { // push quote
					s += nc;
					i++;
				} else if (cQ) {
					inq = false;
					args.push(s); // or add if check to bypass blanks
					s = "";
				} else s += cc;
			} else {
				if (cQ) {
					if (s = s.trim()) /* bypass blank args when outside of quote */
						args.push(s);
					s = "";
					inq = true;
				} else if (" " == cc) {
					if (s = s.trim()) /* bypass blank args when outside of quote */
						args.push(s);
					s = "";
				} else s += cc;
			}
		}
		if (s.trim()) args.push(s);
		return args;
	}
