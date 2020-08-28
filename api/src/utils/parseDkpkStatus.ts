interface Package {
    name: string;
    description: string | null;
    alternatives: string;
    dependencies: string;
}

export const parseDkpkStatus = (data: string) =>
    data.split('\n\n').reduce((collected: Package[], element: string) => {
        const packageOrDepends = element
            .split('\n')
            .filter((line: string) => line.startsWith('Package') || line.startsWith('Depends'));

        if (!packageOrDepends[0]) return collected;

        const name = packageOrDepends[0].replace('Package: ', '');
        const description = element.includes('Description') ? parseDescription(element) : null;

        return [
            ...collected,
            {
                name,
                description,
                ...parseDependencies(packageOrDepends[1]),
            },
        ];
    }, []);

const parseDependencies = (string: any) => {
    const dependenciesRaw = string ? string.replace('Depends: ', '').split(', ') : [];

    const dependencies = dependenciesRaw
        .filter((e: string) => !e.includes('|'))
        .map((dep: string) => (dep.length > 1 ? dep.split(' ')[0] : dep));

    const alternatives = dependenciesRaw
        .filter((e: string) => e.includes('|'))
        .map((e: string) => e.split(' | '))
        .flat()
        .map((dep: string) => (dep.length > 1 ? dep.split(' ')[0] : dep));

    return { dependencies, alternatives };
};

const parseDescription = (string: string) =>
    string
        .substring(string.lastIndexOf('Description: '))
        .replace('Description: ', '')
        .split('\n')
        .filter((e) => e[0] === ' ')
        .join()
        .substring(1)
        .replace('.,', '.')
        .replace(' ., ', '')
        .replace(',,', ',');
