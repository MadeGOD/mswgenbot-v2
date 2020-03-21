module.exports = {
    parseDate: async function (date) {
        var days = {
            Sun: '��',
            Mon: '��',
            Tue: 'ȭ',
            Wed: '��',
            Thu: '��',
            Fri: '��',
            Sat: '��'
        };
        var months = {
            Jan: '1',
            Feb: '2',
            Mar: '3',
            Apr: '4',
            May: '5',
            Jun: '6',
            Jul: '7',
            Aug: '8',
            Sep: '9',
            Oct: '10',
            Nov: '11',
            Dec: '12'
        };
        var toParse = date.toString().split(/ /g);
        var toReturn = new Array();
        toReturn.push(toParse[3] + '��');
        toReturn.push(months[toParse[1]] + '��');
        toReturn.push(toParse[2] + '��');
        toReturn.push(days[toParse[0]] + '����');
        var time = toParse[4].split(':');
        toReturn.push(time[0] + '��');
        toReturn.push(time[1] + '��');
        toReturn.push(time[2] + '��');
        var timeZone = toParse.slice(6).join(' ');
        toReturn.push(timeZone);
        var Final = toReturn.join(' ');
        return Final;
    },
    countTime: async function (time) {
        var remaining = time;
        var day = 0;
        var hour = 0;
        var minute = 0;
        var second = 0;
        var ms = 0;
        day = parseInt(remaining / 86400000);
        remaining -= day * 86400000;
        hour = parseInt(remaining / 3600000);
        remaining -= hour * 3600000;
        minute = parseInt(remaining / 60000);
        remaining -= minute * 60000;
        second = parseInt(remaining / 1000);
        remaining -= second * 1000;
        ms = remaining;
        return (
            day + "�� " + hour + "�ð� " + minute + "�� " + second + "�� " + ms + "ms"
        );
    },
    hasAFK: async function (guild) {
        if (guild.afkChannel) {
            return guild.afkChannel.name;
        } else {
            return '����';
        }
    },
    isVerified: async function (guild) {
        if (guild.verified) {
            return '������';
        } else {
            return '�������� ����';
        }
    },
    stat: async function (user) {
        var toReturn = '';
        for (var i = 0; i < user.presence.activities.length; i++) {
            if (user.presence.activities[i].name == 'Custom Status') {
                if (user.presence.activities[i].emoji) {
                    toReturn += user.presence.activities[i].emoji.name;
                }
                toReturn += `${user.presence.activities[i].state} (���� �޼���)`;
            } else {
                toReturn += `
            ${user.presence.activities[i].name} (����)`;
            }
        }
        return toReturn;
    },
    myRoles: async function (role, guild) {
        var r = new Array();
        role.forEach(function (x) {
            r.push(`${guild.roles.cache.find(a => a.name == x.name)}`);
        });
        var toReturn = r.join(', ');
        return toReturn;
    },
    area: async function (user) {
        var toReturn = '';
        if (user.presence.clientStatus.desktop) {
            toReturn += `
        ����ũ�� ��: ${user.presence.clientStatus.desktop}`;
        }
        if (user.presence.clientStatus.web) {
            toReturn += `
        ����ũ�� ��: ${user.presence.clientStatus.web}`;
        }
        if (user.presence.clientStatus.mobile) {
            toReturn += `
        ����� ��: ${user.presence.clientStatus.mobile}`;
        }
        return toReturn;
    }
}