import ObjectID from "mongodb";
import { hash, compare } from "bcrypt";
import * as jwt from "jsonwebtoken";

let nfts;

export default class NftsDAO {
	static injectDB = async (conn) => {
		if (nfts) {
			return;
		}

		try {
			nfts = await conn.db(process.env.NEXT_PUBLIC_MONGODB_NS).collection("nfts");
		} catch (err) {
			console.error(`Unable to establish connection handle in nftsDAO => ${err}`);
		}
	};

	static getNfts = async (req, res) => {
		try {
			const { hasFilters, filters, id } = req.body;

			let nftsDocs;
			let totalPages;

			if (hasFilters) {
				let andQuery = [];

				for (let i = 0; i < filters.length; i++) {
					andQuery.push({
						attributes: {
							$elemMatch: {
								trait_type: filters[i].trait_type,
								value: filters[i].value,
							},
						},
					});
				}

				nftsDocs = await nfts
					.find({
						$and: [...andQuery],
					})
					.toArray();
			} else {
				nftsDocs = await nfts.findOne({
					_id: id,
				});
			}

			res.status(200).json({
				message: nftsDocs,
			});
		} catch (err) {
			console.error(`Unable to find nfts => ${err}`);

			return {
				error: err,
			};
		}
	};
}
