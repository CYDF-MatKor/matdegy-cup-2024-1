import styled from "styled-components";
import { Button, Input, ProblemEachField, Text } from "../../components";

const Symbol = () => {
	return (
		<ProblemEachField>
			<Text
				style={{
					width: "100%",
					fontFamily: "NotoColorEmoji-Regular, Tofu",
				}}>
				〽️지🍰난🎁🎂M🎈a🎺t🎉K🎊or📧〽️🧿🌶️C🔋u😂p❤️😍에🤣는😊🥺여러🙏💕기😭업😘👍이😅후👏원😁해💀주✌️었🌴다.🐢이🐐에🍄⚽대회🍻👑문제에📸😬여👀러🚨기🏡업🕊️문🏆제😻가🌟🧿들🍀어🎨갔다🍜.🥰💀A✌️번🌴의🐢🐐주🍄인⚽공이🍻👑된📸😬기👀업🚨의🏡🕊️이름🏆은😻🌟OOOOOOO🧿🍀🎨AI🍜이다.
			</Text>
			<Input type="text" maxLength={80} />
			<Button>Submit</Button>
		</ProblemEachField>
	);
};

export default Symbol;
