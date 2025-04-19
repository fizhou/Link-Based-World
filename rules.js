class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);
        
        if (locationData.Item) {
            for (let itemKey in locationData.Item) {
                this.engine.addItem(itemKey, locationData.Item[itemKey]);
            }
        }

        for (let i = 0; i < locationData.Choices.length; i++) {
            let choice = locationData.Choices[i];
            if (choice.RequiredKey) {
                if (this.engine.hasItem(choice.RequiredKey)) {
                    this.engine.addChoice(choice.Text, choice);
                } else {
                    this.engine.show("You require a key to proceed.");
                }
            } else {
                this.engine.addChoice(choice.Text, choice);
            }
        }
    }
    
    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');