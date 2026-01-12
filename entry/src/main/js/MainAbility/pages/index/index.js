import cryptoFramework from '@ohos.security.cryptoFramework';

export default {
    data: {
        result: 'Waiting operation'
    },

    sha256() {
        const that = this;
        const md = cryptoFramework.createMd('SHA256');
        md.update({ data: stringToUint8Array('cryptoFramework') }, function (err) {
            md.digest(function (err, digestOutput) {
                if (err) {
                    that.result = `SHA256 Error:\n ${err.code}`
                    return;
                }
                that.result = `SHA256 Result:\n ${digestOutput.data.toString()}`
            });
        });
    },
    md5() {
        const that = this;
        const md = cryptoFramework.createMd('MD5');
        md.update({ data: stringToUint8Array('cryptoFramework') }, function (err) {
            md.digest(function (err, digestOutput) {
                if (err) {
                    that.result = `MD5 Error:\n${err.code}`
                    return;
                }
                that.result = `MD5 Result:\n${digestOutput.data.toString()}`
            });
        });
    },

    createRandom() {
        this.result =
            `Random Result:\n${cryptoFramework
                .createRandom()
                .generateRandomSync(16)
                .data
                .toString()}`
    }
};

function stringToUint8Array(string) {
    const buffer = [];
    for (let i = 0; i < string.length; i++) {
        buffer.push(string[i].charCodeAt(0))
    }
    return new Uint8Array(buffer);
}
