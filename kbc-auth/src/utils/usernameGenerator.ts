const verbs = ['lively','psychic','french','international','elastic','karate','party','famous','hairy','old','lazer','volcanic','electric','sneaky','new','hissy','mediating','haunted','tough','twinkling','wrinkly','sweet','boiling','antlered','striped','spotty','unfortunate','folky','beautiful','moody','peacefull','indignant','bone','chill','heartbroken','sweet','worldly','faulty','partying','natural','cheeky','cheerful','chilled','chunky','cold-hearted','snuggling','colossal','comforting','grouchy','comic','compassionate','complex','considerate','contemporary','broken','moral','crazed','elegant','fancy','dazzling','magnificent','quaint','skinny','blue','red','green','fluorescent','icy','silly','grumpy','crashing','deafening','rhythmic','fresh','juicy','excellent','magnificent','wonderful','glorious','marvellous','brilliant','supreme','outstanding','prodigious','dazzling','remarkable','formidable','fine','premier','prime','unsurpassed','unequalled','unparalleled','unrivalled','unbeatable','peerless','matchless','singular','unique','transcendent','best','greatest','worthiest','pre-eminent','perfect','faultless','flawless','ace','stellar'];
const nouns = ['berry','squad','dog','dragon','patrolman','deer','hyena','pup','bug','louse','queen','master','toaster','legend','sandwich','lettuce','kitty','grandma','chef','cake','president','band','earth','newt','cat','oxygen','wombat','croc','robot','lizard','king','octopus','knight','mango','mammoth','aardvark','alligator','alien','android','sprouts','apple','apricot','artichoke','asian-pear','asparagus','atemoya','avocado','bamboo','banana','edamame','beans','beets','belgian','peppers','bitter-melon','blackberries','blueberries','bok-choy','boniato','boysenberries','broccoflower','broccoli','cabbage','cactus','cantaloupe','carambola','carrots','cauliflower','celery','chayote','cherimoya','cherries','coconuts','collardgreens','corn','cranberries','cucumber','dates','plums','eggplant','endive','escarole','feijoa','fennel','figs','garlic','gooseberries','grapefruit','grapes','onions','greens','guava','hominy','melon','jicama','kale','kiwifruit','kohlrabi','kumquat','leeks','lemons','limes','longan','loquat','lychee','madarins','malanga','mandarin','mulberries','mushrooms','napa','nectarines','okra','onion','oranges','papayas','parsnip','peaches','pears','peas','persimmons','pineapple','plantains','pomegranate','potatoes','prickly-pear','prunes','pummelo','pumpkin','quince','radicchio','radishes','raisins','raspberries','rhubarb','rutabaga','shallots','peas','spinach','squash','strawberries','sweetpotato','tangelo','tangerines','tomatillo','tomato','turnip','fruit','chestnuts','watercress','watermelon','waxed','yams','yuca','zucchini','puppy','turtle','rabbit','parrot','kitten','goldfish','mouse','hamster','cow','ducks','shrimp','pig','goat','crab','bee','sheep','fish','turkey','dove','chicken','horse','crow','peacock','sparrow','goose','stork','pigeon','hawk','bald-eagle','raven','flamingo','seagull','ostrich','swallow','black-bird','robin','swan','owl','woodpecker','squirrel','chimpanzee','ox','lion','panda','walrus','otter','kangaroo','monkey','mole','elephant','leopard','fox','coyote','hedgehog','giraffe','camel','koala','tiger','bear','blue-whale','raccoon','arctic-wolf','crocodile','dolphin','snake','hippopotamus','elk','gorilla','bat','hare','toad','frog','rat','badger','reindeerseal','shark','seahorse','starfish','whale','penguin','jellyfish','squid','lobster','pelican','clams','shells','sea-urchin','cormorant','coral','moth','butterfly','spider','ant','dragonfly','fly','mosquito','grasshopper','beetle','cockroach','centipede','worm','woodlouse','aircraft','airplane','ambulance','auto','automobile','balloon','barge','bus','bicycle','battleship','boat','cab','car','cart','chariot','clunker','convertible','convoy','crane','cruiser','camper','carriage','catamaran','chopper','coach','wagon','coupe','cutter','carrier','chairlift','combine','cycle','driver','elevator','engine','ferry','fireboat','frigate','galleon','glider','gridlock','handcar','haul','helicopter','hull','hydrofoil','harvester','hybrid','hovercraft','hearse','jeep','jet','journey','kayak','ketch','lifeboat','lorry','motor','motorcycle','motorboat','narrowboat','oar','oxcart','paddle','passenger','propeller','pilot','parachute','plane','ride','ragtop','rocket','rudder','railroad','rover','riverboat','raft','railway','rowboat','sail','scull','ship','sailboat','schooner','seaplane','segway','shuttle','satellite','scooter','sedan','sled','steamboat','surrey','sledge','snowmobile','spaceship','stroller','steamship','suv','snowplow','speedcar','subway','subcompact','submarine','taxi','tire','train','trolley','tank','tracks','tram','truck','tanker','tractor','trailer','tricycle','tugboat','unicycle','umiak','van','vessel','vespa','vehicle','warship','wheelchair','wheel','yacht','yawl','zamboni','zeppelin'];

function randomFromArray<T>(a:T[]) {
    return a[Math.floor(Math.random() * a.length)];
}

function generateVerb() {
    return randomFromArray(verbs);
}
function generateNoun() {
    return randomFromArray(nouns);
}

const generateNumber = () => {
    return Math.floor(Math.random() * 9) + 1;
}

export const generateNames = () => {
    const verb = generateVerb();
    const noun = generateNoun();


    return {
        verb: `${verb.charAt(0).toUpperCase()}${verb.slice(1)}`,
        noun: `${noun.charAt(0).toUpperCase()}${noun.slice(1)}`,
        number: generateNumber(),
    }
}

export const splitName = (username:string) => {
    const number = username.slice(username.length - 1);
    const names = username.slice(0, -1).split(/(?=[A-Z])/);

    if (names.length === 2) {
        return {
            verb: names[0],
            noun: names[1],
            number: number,
        }
    }

    return username;
}