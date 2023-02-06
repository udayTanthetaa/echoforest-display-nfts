import { useEffect, useState } from "react";
import React from "react";
import { Attributes } from "../constants";

const Test = () => {
	const [currStates, setCurrStates] = useState({
		Animal: {
			state: "Any",
		},

		Class: {
			state: "Any",
		},

		Background: {
			state: "Any",
		},

		Color: {
			state: "Any",
		},

		Hat: {
			state: "Any",
		},

		Staff: {
			state: "Any",
		},

		Tome: {
			state: "Any",
		},

		Earring: {
			state: "Any",
		},

		Eye_Patch: {
			state: "Any",
		},

		Sword: {
			state: "Any",
		},

		Lute: {
			state: "Any",
		},

		Cloak: {
			state: "Any",
		},

		Bow: {
			state: "Any",
		},

		Quiver: {
			state: "Any",
		},

		Scythe: {
			state: "Any",
		},

		Wand: {
			state: "Any",
		},

		Armor: {
			state: "Any",
		},

		Cape: {
			state: "Any",
		},

		Helm: {
			state: "Any",
		},

		Amulet: {
			state: "Any",
		},

		Antler: {
			state: "Any",
		},
	});

	const [nfts, setNfts] = useState();
	const [changed, setChanged] = useState(false);

	useEffect(() => {
		if (changed) {
			setCurrStates(currStates);
			setChanged(false);
		}
	}, [changed]);

	const fetchNfts = async () => {
		let filters = [];

		for (let i = 0; i < Attributes.length; i++) {
			if (currStates[Attributes[i].value].state !== "Any") {
				filters.push({
					trait_type: Attributes[i].display,
					value: currStates[Attributes[i].value].state,
				});
			}
		}

		const res = await fetch("/api/nfts/getNfts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				hasFilters: true,
				filters: filters,
				id: "2",
			}),
		});

		const data = await res.json();

		setNfts(data.message);
		console.log(nfts);
	};

	return (
		<>
			<h1>Test</h1>
			<hr />
			<button
				onClick={async (e) => {
					e.preventDefault();

					const res = await fetch("/api/nfts/getNfts", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							hasFilters: true,
							filters: [
								{
									trait_type: "Background",
									value: "Summer",
								},
								{
									trait_type: "Color",
									value: "Black",
								},
							],
							id: "2",
						}),
					});

					const data = await res.json();

					console.log(data.message);
				}}
			>
				Get NFTs
			</button>

			<hr />

			<div className="bg-slate-50 min-h-screen p-3">
				<div className="grid grid-cols-4 items-start gap-3 ">
					{Attributes.map((attribute, attributeIndex) => {
						return (
							<div key={attributeIndex} className="flex flex-col items-center space-y-[4px]">
								<div className="py-[2px] px-[8px] font-medium text-lg text-white bg-slate-400 rounded-lg">
									{attribute.display}
								</div>

								<div className="flex flex-col items-center w-full h-52 overflow-auto space-y-[4px] px-[4px]">
									{attribute.list.map((attr, attrIndex) => {
										return (
											<div
												key={attrIndex}
												onClick={async () => {
													let newStates = currStates;
													newStates[attribute.value].state = attr;

													setChanged(true);
													await fetchNfts();
													setCurrStates(newStates);
												}}
												className={`  bg-slate-200 w-full flex flex-col items-center rounded-lg
												text-center hover:text-slate-100 hover:bg-blue-500 hover:cursor-pointer hover:font-medium
												
												
												${currStates[attribute.value].state === attr ? "bg-green-500 text-white" : "bg-slate-400 text-slate-800"}
												`}
											>
												{attr}
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>

				<hr />

				<div className="grid grid-cols-4 items-start gap-4">{nfts.map((nft, nftIndex) => {})}</div>
			</div>
		</>
	);
};

export default Test;
