class EventBuilder {
    constructor(categoryBuilder, eventName, properties) {
        this.categoryName = categoryBuilder.categoryName;
        this.eventName = `${this.categoryName} ${eventName}`;
        this.properties = properties;
    }

    build() {
        return {
            eventName: this.eventName,
            categoryName: this.categoryName,
            properties: this.properties
        };
    }
}

class ShowEventBuilder extends EventBuilder {
    constructor(categoryBuilder) {
        super(categoryBuilder, 'Show');
    }
}

class AbstractCategoryBuilder {
    constructor(name) {
        this.categoryName = name;
    }

    events() {
        throw new TypeError('Calling abstract class method');
    };
}

class SimpleCategoryBuilder extends AbstractCategoryBuilder {
    constructor(name) {
        super(name);
    }

    events() {
        return {
            show: () => new ShowEventBuilder(this)
        };
    }
}

class SettingsCategoryBuilder extends AbstractCategoryBuilder {
    constructor() {
        super('Settings');
    }

    events() {
        return {
            show: () => new ShowEventBuilder(this),
            networkSelected: networkId => new EventBuilder(this, 'Network Selected', {
                Network: networkId
            }),
            customSettingsApplied: nodeUrl => new EventBuilder(this, 'Custom Network Applied', {
                ['Node URL']: nodeUrl
            })
        }
    }
}

class SearchCategoryBuilder extends AbstractCategoryBuilder {
    constructor() {
        super('Search');
    }

    events() {
        return {
            results: (searchResult) => new EventBuilder(this, 'Results', {
                ['Result Type']: searchResult
            })
        }
    }
}

class FaucetCategoryBuilder extends AbstractCategoryBuilder {
    constructor() {
        super('Faucet');
    }

    events() {
        return {
            request: () => new EventBuilder(this, 'Acryl Requested')
        }
    }
}

class AnalyticsEventBuilder {
    main() {
        return new SimpleCategoryBuilder('Main');
    }

    blocks() {
        return new SimpleCategoryBuilder('Blocks');
    }

    peers() {
        return new SimpleCategoryBuilder('Peers');
    }

    nodes() {
        return new SimpleCategoryBuilder('Nodes');
    }

    settings() {
        return new SettingsCategoryBuilder();
    }

    search() {
        return new SearchCategoryBuilder();
    }

    faucet() {
        return new FaucetCategoryBuilder();
    }
}

export default AnalyticsEventBuilder;
