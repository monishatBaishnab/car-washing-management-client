const Facebook = ({ classNames }: { classNames?: { svg?: string; path?: string } }) => {
    return (
        <svg
            className={classNames?.svg}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className={classNames?.path}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.8416 24V15.7891H19.4981L19.8929 12.591H16.8416V10.5469C16.8416 9.62225 17.0892 8.98957 18.3673 8.98957H20V6.12514C19.719 6.08343 18.7487 6 17.6245 6C15.2691 6 13.6632 7.49479 13.6632 10.2341V12.5979H11V15.7961H13.6632V24H16.8416Z"
                fill="#C3CAD9"
            />
        </svg>
    );
};

export default Facebook;
