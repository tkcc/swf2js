if (typeof Object.defineProperty !== "function") {
    Object.defineProperty = function (obj, prop, desc)
    {
        if ("value" in desc) {
            obj[prop] = desc.value;
        }

        if ("get" in desc) {
            obj.__defineGetter__(prop, desc.get);
        }

        if ("set" in desc) {
            obj.__defineSetter__(prop, desc.set);
        }

        return obj;
    };
}

if (typeof Object.defineProperties !== "function") {
    Object.defineProperties = function (obj, descs)
    {
        for (var prop in descs) {
            if (descs.hasOwnProperty(prop)) {
                Object.defineProperty(obj, prop, descs[prop]);
            }
        }
        return obj;
    };
}

if (typeof Object.getPrototypeOf !== "function") {
    Object.getPrototypeOf = function (obj)
    {
        return obj.__proto__;
    };
}

if (typeof Object.setPrototypeOf !== "function") {
    Object.setPrototypeOf = function (obj, proto)
    {
        obj.__proto__ = proto;
        return obj;
    };
}