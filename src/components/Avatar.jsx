export default function Avatar({ initials }) {
	return (
		<div className={`w-10 h-10 ${initials ? 'bg-gray-300' : 'bg-blue-500'} rounded-full flex items-center justify-center font-bold`}>
			{initials.charAt(0)}
		</div>
    );
}