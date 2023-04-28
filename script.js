const summonerName = "<summoner-name>"
const apiKey = "api_key=" + "<api-key>" 

async function fetchSumId(summonerName, apiKey) {
	const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?${apiKey}`;

	const id = await fetch(url)
	.then(function(res) {
		return res.json();
	})
	.then(function(res) {
		return (res.id);
	});
	return (id);
}

async function fetchSumQueue(sumId, apiKey) {
	const url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumId}?${apiKey}`

	const rankedQueue = await fetch(url)
	.then((res) => res.json())
	.then(function(res) {
		for(queue in res) {
			if (res[queue].queueType == "RANKED_SOLO_5x5")
				return (res[queue]);
		}
	});
	return (rankedQueue)
}

function updateSumName(res) {
	document.querySelector('.sum-name').innerText = res.summonerName;
}

function updateSumRank(res) {
	document.querySelector('.sum-rank').innerText = `${res.tier} ${res.rank}	|	${res.leaguePoints} LP`;
}

function updateSumWinrate(res) {
	document.querySelector('.sum-winrate .win').innerText = `${res.wins}W`;
	document.querySelector('.sum-winrate .lose').innerText = `${res.losses}L`;
	document.querySelector('.sum-winrate .winrate').innerText = `${Math.floor(res.wins / (res.wins + res.losses) * 100)}%`;
}

function updateSumInfo(res) {
	updateSumName(res);
	updateSumRank(res);
	updateSumWinrate(res);
}

function updateWidget() {
	
	fetchSumId(summonerName, apiKey)
	.then(function(res) {
		return fetchSumQueue(res, apiKey)
	})
	.then((res) => {
		updateSumInfo(res);
	});
}
updateWidget();
const interval = setInterval(updateWidget, 5000)
