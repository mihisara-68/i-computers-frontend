export default function LoadingAnimation() {
    return (
        <div className="w-full h-[300px] flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            <h2 className="text-lg font-semibold text-gray-700">
                Loading Products...
            </h2>

            <p className="text-sm text-gray-500">
                Please wait while products are loading
            </p>
        </div>
    );
}