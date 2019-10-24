let trie = [];
let prevNode = null;

let pointer = [];
let lastNode = [];

function main(params) {
	let input = ["cart", "car", "card", "call"];
	
	input.forEach(word => {
		console.log(word);

		if(hasPointer(word[0]) === -1) {
			pointer.push(word[0]);
		}
		
		for (let i = 0; i < word.length; i++) {
			const l = word[i];
			buildWord(l, i === word.length - 1,  i);
		}

		prevNode = null;
	});

	console.log(trie);
	console.log(pointer);

	console.log("---find---");

	find();
}

function find() {
	let find = ["cart"];
	let res = null;

	find.forEach(word => {
		console.log(word);

		if(hasPointer(word[0]) === -1) return "no match";
		
		for (let i = 0; i < word.length; i++) {
			const l = word[i];
			res = buildWord(l, i === word.length - 1,  i, true);
		}
	});

	if(res !== null) console.log(res);
	else console.log(prevNode);
}

function buildWord(l, isWord, i, search) {
	let n = null;

	if(trie.length === 0) {
		n = node({"parent": null, "val": l, "isWord": isWord});
	}
	//keep going
	else if(trie[i] !== undefined && trie[i].val === l) {
		prevNode = trie[i];

		if(!search) {
			prevNode.used++;
			if(isWord) prevNode.isWord = true;
		}
	}
	//branch off
	else n = node({"parent": prevNode, "val": l, "isWord": isWord});

	if(search)return n;

	if(n !== null) {
		trie.push(n);
		prevNode = trie[trie.length - 1];
	}
}

function hasPointer(l) {
	if(pointer.length === 0) return -1;

	for (let i = 0; i < pointer.length; i++) {
		const element = pointer[i];
		if(element === l)return i;
	}
	return -1;
}

function node(params) {
	let parent = params.parent;
	let val = params.val;
	let isWord = params.isWord;
	let used = 1;
	return { parent: parent, val: val, isWord: isWord, used: used };
}

main();