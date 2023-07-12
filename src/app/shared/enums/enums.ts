export enum Gender {
    Male = "Male",
    Female = "Female",
}

export enum Airport {
    Istanbul = "Istanbul",
    Sabiha = "Sabiha"
}


export enum FlightType {
    FromAirPort = 'arrival',
    ToAirPort = 'departure'
}

export function mapEnumToOptions(_enum) {
    const options = [];
    for (const member in _enum)
        if (!isNumber(member))
            options.push({
                key: member,
                value: _enum[member],
            });
    return options;
}

function isNumber(value) {
    return value == Number(value);
}