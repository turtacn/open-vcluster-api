from setuptools import setup, find_packages

setup(
    name="open-vcluster-api",
    version="0.1.0",
    description="Python SDK for open-vcluster-api",
    author="turtacn",
    author_email="",
    url="https://github.com/turtacn/open-vcluster-api",
    packages=find_packages(),
    install_requires=[
        "grpcio>=1.59.0",
        "protobuf>=4.24.0",
    ],
    python_requires=">=3.8",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
)
