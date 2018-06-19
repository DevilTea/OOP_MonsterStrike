// 宣告 namespace
'use strict'
Framework.Util = new (class Util {
	isAbout(realValue,aboutValue,delta) {
		if(realValue < aboutValue + delta && realValue > aboutValue - delta){
			return true;
		}
		else{
			return false;
		}
	}

	findValueByKey(targetList,key) {
		for(let i = 0, l = targetList.length; i < l; i++){
			if(targetList[i].name === key ){
				return targetList[i];
			}
		}
		return null;
	}

	isUndefined(obj) {
		return (typeof obj === 'undefined');
	}

	isNull(obj) {
		return (obj === null);
	}

	isFunction(obj) {
		return (typeof  obj === 'function');
	}

	isNumber(obj) {
		return (typeof  obj === 'number');
	}

	isObject(obj) {
		return (typeof  obj === 'object');
	}

	isBoolean(obj) {
		return (typeof  obj === 'boolean');
	}

	isString(obj) {
		return (typeof  obj === 'string');
	}

	isCanvas(obj) {
		if(!this.isUndefined(obj.tagName)){
			return (obj.tagName === 'CANVAS');
		}
		return false;
	}

	isImage(obj) {
		if(!this.isUndefined(obj.tagName)){
			return (obj.tagName === 'IMG');
		}
		return false;
	}

	namespace(ns_string) {
		let parts = ns_string.split('.'),
			parent = Framework,
			i;
		if (parts[0] === 'Framework') {
			parts = parts.slice(1);
		}
		for (let i = 0; i < parts.length; i += 1) {
			if (isUndefined(parent[parts[i]])) {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parts;
	}

	overrideProperty(defaultSettings, userSettings) {
		for (let key in defaultSettings) {
			if (isUndefined(userSettings[key])) {
				userSettings[key] = defaultSettings[key]
			}
		}
		return userSettings
	}
})

if(Framework.Util.isUndefined(Date.prototype.format)){
    // Extend Date's function , add format method
    Date.prototype.format = function (format) {
        let o = {
            'M+': this.getMonth() + 1, //month
            'd+': this.getDate(),    //day
            'h+': this.getHours(),   //hour
            'm+': this.getMinutes(), //minute
            's+': this.getSeconds(), //second
            'q+': Math.floor((this.getMonth() + 3) / 3),  //quarter
            'S': this.getMilliseconds() //millisecond
        };

        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (let k in o)if (new RegExp('(' + k + ')').test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ('00' + o[k]).substr(('' + o[k]).length));
        return format;
    }
}