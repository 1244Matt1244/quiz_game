from setuptools import setup, find_packages

setup(
    name="quiz_game",
    version="0.2.0",
    packages=find_packages(),
    install_requires=[
        "rich>=12.0.0",
        "pyyaml>=6.0",
        "sqlite3"
    ],
    entry_points={
        'console_scripts': ['quizgame=quiz_game.__main__:main']
    },
    include_package_data=True,
    package_data={
        'quiz_game': ['data/*.yaml', 'data/*.json']
    }
)
