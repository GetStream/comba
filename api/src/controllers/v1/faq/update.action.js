import Faq from 'models/faq';

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const params = req.params;

		const faq = await Faq.updateOne({ _id: params.faq }, { $set: data });

		res.status(200).json(faq);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
