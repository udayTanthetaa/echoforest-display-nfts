import clientPromise from "../../../mongodb";
import NftsDAO from "../../../mongodb/dao/nftsDAO";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const client = await clientPromise;

			await NftsDAO.injectDB(client);
			await NftsDAO.getNfts(req, res);
		} catch (err) {
			res.status(500).json({
				code: 500,
				message: err.message,
			});
		}
	} else {
		res.status(500).json({
			code: 421,
			message: "Invalid Route.",
		});
	}
};

export default handler;
